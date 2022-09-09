import { NotFoundException } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { TaskStatus } from "./task-status.enum";
import { TasksRepository } from "./tasks.repository";
import { TasksService } from "./tasks.service";

const mockTasksReportsitory = () => ({
  getTasks: jest.fn(),
  findOneBy: jest.fn(),
});

const mockUser = {
  username: "Pranik",
  id: "101",
  password: "testtest",
  tasks: [],
};

const mockTask = {
  title: "Test",
  description: "Test description",
  id: "testId",
  status: TaskStatus.OPEN,
};

describe("TasksService", () => {
  let tasksService: TasksService;
  let tasksRepository;

  beforeEach(async () => {
    const module = Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TasksRepository, useFactory: mockTasksReportsitory },
      ],
    }).compile();

    tasksService = (await module).get<TasksService>(TasksService);
    tasksRepository = (await module).get<TasksRepository>(TasksRepository);
  });

  describe("getTasks", () => {
    it("calls TasksRepository.getTasks and returns the result", async () => {
      tasksRepository.getTasks.mockResolvedValue("test");
      const result = await tasksService.getTasks(null, mockUser);
      expect(result).toEqual("test");
    });
  });

  describe("getTasksById", () => {
    it("calls TasksRepository.findOneBy and returns the result", async () => {
      tasksRepository.findOneBy.mockResolvedValue(mockTask);

      const result = await tasksService.getTaskById("testId", mockUser);
      expect(result).toEqual(mockTask);
    });

    it("calls TasksRepository.findOneBy and handles an error", () => {
      tasksRepository.findOneBy.mockResolvedValue(null);

      const result = tasksService.getTaskById("testId", mockUser);
      expect(result).rejects.toThrow(NotFoundException);
    });
  });
});

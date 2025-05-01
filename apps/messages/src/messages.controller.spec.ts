import { Test, TestingModule } from '@nestjs/testing';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';

describe('MessagesController', () => {
  let messagesController: MessagesController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [MessagesController],
      providers: [MessagesService],
    }).compile();

    messagesController = app.get<MessagesController>(MessagesController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(messagesController.getHello()).toBe('Hello World!');
    });
  });
});

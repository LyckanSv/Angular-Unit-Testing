import { TestBed } from "@angular/core/testing"
import { LoggerService } from "../Logger/logger.service"
import { CalculatorService } from "./calculator.service"

describe("CalculatorService", () => {
  let mockLoggerService: jasmine.SpyObj<LoggerService>
  let calculator: CalculatorService


  beforeEach(() => {
    console.log("calling before eachs");

    const tempMockLoggerService = jasmine.createSpyObj(LoggerService, ['log'])

    TestBed.configureTestingModule({
      providers: [
        CalculatorService,
        {
          provide: LoggerService,
          useValue: tempMockLoggerService
        }
      ]
    })


    calculator = TestBed.inject(CalculatorService)
    mockLoggerService = TestBed.inject(LoggerService) as jasmine.SpyObj<LoggerService>

  })

  it("should add two numbers", () => {
    console.log('Add');

    let result = calculator.add(2, 2)
    expect(result).toBe(4)
    expect(mockLoggerService.log).toHaveBeenCalledTimes(1)
  })

  it("should substract two numbers", () => {
    console.log('sub');

    let result = calculator.subtract(4, 2)
    expect(result).toBe(2)
    expect(mockLoggerService.log).toHaveBeenCalledTimes(1)
  })
})

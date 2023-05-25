import { of } from 'rxjs';
import { MemberService } from './member.service';


describe('MemberService', () => {
  let service: MemberService;
  let httpClientSpy: any;

  beforeEach(() => {
    httpClientSpy = {
      get: jest.fn()
    }
    service = new MemberService(httpClientSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should test getMembers', () => {
    const res = "Anton";
    const url = "http://localhost:8080/members";
    jest.spyOn(httpClientSpy, 'get').mockReturnValue(of(res));
    service.getMembers();
    expect(httpClientSpy.get).toBeCalledTimes(1);
    expect(httpClientSpy.get).toHaveBeenCalledWith(url);
  })

  it('should test getMembers', () => {
    const res = "Anton";
    const url = "http://localhost:8080/members";
    jest.spyOn(httpClientSpy, 'get').mockReturnValue(of(res));
    service.getMembers();
    expect(httpClientSpy.get).toBeCalledTimes(1);
    expect(httpClientSpy.get).toHaveBeenCalledWith(url);
  })
});

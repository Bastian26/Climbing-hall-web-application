import { AppComponent } from "./app.component"

describe ('AppComponent', () => {
  let fixture : AppComponent;

  beforeEach(() => {
    fixture = new AppComponent();
  })

  it('should have a title climbing-hall', () => {
    expect(fixture.title).toEqual('climbing-hall');
  })
})

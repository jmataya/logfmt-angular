describe("LogFmt", function() {
  // API
  var LogFmt, $httpBackend;

  // Load required modules.
  beforeEach(angular.mock.module("logfmt"));

  beforeEach(inject(function($injector) {
    LogFmt = $injector.get("LogFmt");
  }));

  describe("Basic logging to console", function() {
    it("should contain the logfmt service", function() {
      expect(LogFmt).not.toBe(null);
    });

    it("should log to console", function() {
      spyOn(console, "log");
      LogFmt.log({message: "Test"});
      expect(console.log).toHaveBeenCalled();
    });

    it("should log a simple message to the console", function() {
      LogFmt.getCurrentTimestamp = jasmine.createSpy("getCurrentTimestamp() spy").andReturn("14-5-2014-00:00:00");
      spyOn(console, "log");
      LogFmt.log({message: "Test"});
      expect(console.log).toHaveBeenCalledWith("timestamp=14-5-2014-00:00:00 message=Test");
    });
  });
});

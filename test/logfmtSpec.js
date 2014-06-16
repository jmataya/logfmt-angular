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

  describe("Advanced key-value logging to console", function() {
    it("should log correctly if a message has a space", function() {
      LogFmt.getCurrentTimestamp = jasmine.createSpy("getCurrentTimestamp() spy").andReturn("14-5-2014-00:00:00");
      spyOn(console, "log");
      LogFmt.log({message: "Test message"});
      expect(console.log).toHaveBeenCalledWith("timestamp=14-5-2014-00:00:00 message=\"Test message\"");
    });

    it("should log correctly if a value is a number", function() {
      LogFmt.getCurrentTimestamp = jasmine.createSpy("getCurrentTimestamp() spy").andReturn("14-5-2014-00:00:00");
      spyOn(console, "log");
      LogFmt.log({message: "Test", id: 1});
      expect(console.log).toHaveBeenCalledWith("timestamp=14-5-2014-00:00:00 message=Test id=1");
    });

    it("should log an empty string if a parameter is undefined", function() {
      LogFmt.getCurrentTimestamp = jasmine.createSpy("getCurrentTimestamp() spy").andReturn("14-5-2014-00:00:00");
      spyOn(console, "log");
      LogFmt.log({message: undefined});
      expect(console.log).toHaveBeenCalledWith("timestamp=14-5-2014-00:00:00 message=\"\"");
    });
  })
});

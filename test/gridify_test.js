(function ($) {
  module('jQuery.gridify');

  test('is gridify', function () {
    expect(2);
    strictEqual($.gridify(), 'gridify.', 'should be gridify');
    strictEqual($.gridify({punctuation: '!'}), 'gridify!', 'should be thoroughly gridify');
  });
  
}(jQuery));

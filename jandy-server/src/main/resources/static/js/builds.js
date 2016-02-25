// Generated by CoffeeScript 1.8.0
(function() {
  var TimelineGraph;

  TimelineGraph = (function() {
    function TimelineGraph() {}

    TimelineGraph.prototype.start = function(projectId) {
      var h, height, paper, w, width;
      h = 140;
      paper = Raphael("timeline", '100%', h);
      height = 110;
      w = $("#timeline").width();
      width = $("#timeline").width() - 10;
      return $.get(ROOT_URL + "/rest/projects/" + projectId + "/builds", (function(_this) {
        return function(builds) {
          var build, duration, dx, i, mm, p, prev, x, y, _i, _j, _k, _l, _len, _len1, _len2, _len3, _len4, _m;
          dx = width / (builds.length - 1);
          mm = {
            min: Number.MAX_VALUE,
            max: Number.MIN_VALUE
          };
          for (_i = 0, _len = builds.length; _i < _len; _i++) {
            build = builds[_i];
            if (build.profContextDump.maxTotalDuration < mm.min) {
              mm.min = build.profContextDump.maxTotalDuration;
            }
            if (build.profContextDump.maxTotalDuration > mm.max) {
              mm.max = build.profContextDump.maxTotalDuration;
            }
          }
          i = 0;
          for (_j = 0, _len1 = builds.length; _j < _len1; _j++) {
            build = builds[_j];
            build.num = i++;
          }
          for (_k = 0, _len2 = builds.length; _k < _len2; _k++) {
            build = builds[_k];
            duration = build.profContextDump.maxTotalDuration;
            y = 5 + height - (((duration - mm.min) / (mm.max - mm.min)) * height);
            x = 5 + build.num * dx;
            build.r = {};
            build.r.x = x;
            build.r.y = y;
            build.r.color = build.profContextDump.elapsedDuration <= 0 ? "green" : "red";
            paper.text(x, h - 5, "#" + build.number);
            paper.path("M" + x + "," + (h - 19) + "L" + x + "," + (h - 11) + "Z");
          }
          prev = null;
          for (_l = 0, _len3 = builds.length; _l < _len3; _l++) {
            build = builds[_l];
            if (prev !== null) {
              p = paper.path("M" + prev.r.x + "," + prev.r.y + "L" + build.r.x + "," + build.r.y + "Z").attr("stroke-width", 2).attr("stroke", "#d3d3d3");
            }
            prev = build;
          }
          for (_m = 0, _len4 = builds.length; _m < _len4; _m++) {
            build = builds[_m];
            paper.circle(build.r.x, build.r.y, 4).attr({
              'fill': build.r.color
            });
          }
          return paper.path("M0," + (h - 15) + "L" + w + "," + (h - 15) + "Z");
        };
      })(this));
    };

    return TimelineGraph;

  })();

  jandy.TimelineGraph = TimelineGraph;

}).call(this);

//# sourceMappingURL=builds.js.map

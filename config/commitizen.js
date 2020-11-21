"use strict";

module.exports = {
  scopes: [
    { name: "*" },
    { name: "Datatable component" },
    { name: "Body components" },
    { name: "Header components" },
    { name: "Footer components" },
    { name: "Columns" },
    { name: "Directives" },
    { name: "Services" },
    { name: "CSS" },
    { name: "Types" },
    { name: "Utils" },
    { name: "Misc" }
  ],
  allowBreakingChanges: false,
  footerPrefix: "META DATA:",

  // limit subject length
  subjectLimit: 100,
  quoteMessageInGitCommit: false
};

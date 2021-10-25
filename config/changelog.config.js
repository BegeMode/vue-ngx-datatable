'use strict';

var parserOpts = {
  headerPattern: /^(\w*)(?:\((.*)\))?\: (.*)$/,
  headerCorrespondence: [
    'type',
    'scope',
    'subject'
  ],
  noteKeywords: ['BREAKING CHANGE', 'BREAKING CHANGES'],
  revertPattern: /^revert:\s([\s\S]*?)\s*This reverts commit (\w*)\./,
  revertCorrespondence: ['header', 'hash']
};

var writerOpts = {
  transform: function (commit, context) {
      var discard = true;
      var issues = [];

      commit.notes.forEach(function (note) {
        note.title = 'BREAKING CHANGES';
        discard = false;
      });
      if (commit.type === 'feat') {
        commit.type = 'Features';
      } else if (commit.type === 'fix') {
        commit.type = 'Bug Fixes';
      } else if (commit.type === 'perf') {
        commit.type = 'Performance Improvements';
      } else if (commit.type === 'revert') {
        commit.type = 'Reverts';
      } else if (commit.type === 'docs') {
        commit.type = 'Documentation';
      } else if (commit.type === 'style') {
        commit.type = 'Styles';
      } else if (commit.type === 'refactor') {
        commit.type = 'Code Refactoring';
      } else if (commit.type === 'test') {
        commit.type = 'Tests';
      } else if (discard) {
        return;
      } else if (commit.type === 'chore') {
        commit.type = 'Chores';
      }

      if (commit.scope === '*') {
        commit.scope = '';
      }

      if (typeof commit.hash === 'string') {
        commit.hash = commit.hash.substring(0, 7);
      }

      // remove references that already appear in the subject
      commit.references = commit.references.filter(function (reference) {
        if (issues.indexOf(reference.issue) === -1) {
          return true;
        }

        return false;
      });

      // console.log('writerOpts transform commit', commit);
      return commit;
  },
  groupBy: 'type',
  commitGroupsSort: 'title',
  commitsSort: ['scope', 'subject'],
  noteGroupsSort: 'title',
};

module.exports = {
  parserOpts: parserOpts,
  writerOpts: writerOpts
};

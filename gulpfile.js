const gulp = require('gulp');
const ts = require('gulp-typescript');
var del = require('del');
const JSON_FILES = ['src/*.json', 'src/**/*.json'];
const COMMAND_FILES = ['src/commands/*.sh'];

// pull in the project TypeScript config
const tsProject = ts.createProject('tsconfig.json');

gulp.task('scripts', () => {
  const tsResult = tsProject.src()
    .pipe(tsProject());
  return tsResult.js.pipe(gulp.dest('dist'));
});

gulp.task('watch', ['scripts'], () => {
  gulp.watch('src/**/*.ts', ['scripts']);
});

gulp.task('commands', function () {
  return gulp.src(COMMAND_FILES)
    .pipe(gulp.dest('dist/commands'));
});

gulp.task('assets', function () {
  return gulp.src(JSON_FILES)
    .pipe(gulp.dest('dist'));
});

gulp.task('clean', function () {
  return del([
    'dist/**/*'
  ]);
});

gulp.task('default', ['watch', 'assets', 'commands']);
gulp.task('build', ['clean', 'assets', 'commands', 'scripts']);

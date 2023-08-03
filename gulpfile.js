const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const size = require('gulp-size');
const newer = require('gulp-newer');
const uglify = require('gulp-uglify');
const jsImport = require('gulp-js-import');

const rollup = require('gulp-better-rollup');
// const babel = require('rollup-plugin-babel');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
// const del = require('del');
// const clean = require('gulp-clean')

const paths = {
  html: {
    src: ['src/index.html'],
    dest: 'dist/',
  },
  styles: {
    src: ['src/scss/**.scss'],
    dest: 'dist/css/',
  },
  scripts: {
    src: ['src/js/**.js'],
    dest: 'dist/js/',
  },
  images: {
    src: 'src/img/**',
    dest: 'dist/img/',
  },
  icons: {
    src: 'src/icons/**',
    dest: 'dist/icons/',
  },
  fonts: {
    src: 'src/fonts/**',
    dest: 'dist/fonts/',
  },
  bootstrap: {
    src: './node_modules/bootstrap/dist/**/*',
    dest: 'dist/bootstrap/',
  },
};

// gulp.task('clean', function () {
//   return del.sync('dist')
// });

//   function clean () {
//     return gulp.src(paths.scripts.src)
//         .pipe(clean({force: true}))
//         .pipe(gulp.dest('dist'));
// };
//   gulp.task('clean', function(){
//     return del('dist/**', {force:true});
// })

// function clean() {
//     return  gulp.src('./assembly.json')
//             .pipe(cleanDir('./dist'))
//             .pipe(gulp.dest('./dist'))
//   }

function watch() {
  browserSync({
    server: {
      baseDir: 'dist',
    },
  });
  gulp.watch(paths.html.dest).on('change', browserSync.reload);
  gulp.watch(paths.html.src, html);
  gulp.watch(paths.styles.src, styles);
  gulp.watch(paths.scripts.src, scripts);
  gulp.watch(paths.images.src, images);
}

function styles() {
  return gulp
    .src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(
      autoprefixer({
        cascade: false,
      })
    )
    .pipe(
      cleanCSS({
        level: 2,
      })
    )
    .pipe(rename({ suffix: '.min', prefix: '' }))
    .pipe(sourcemaps.write('.'))
    .pipe(
      size({
        showFiles: true,
      })
    )
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(browserSync.stream());
}

function html() {
  return gulp
    .src(paths.html.src)
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(
      size({
        showFiles: true,
      })
    )
    .pipe(gulp.dest(paths.html.dest))
    .pipe(browserSync.stream());
}

function fonts() {
  return gulp.src(paths.fonts.src).pipe(gulp.dest(paths.fonts.dest));
}

function icons() {
  return gulp.src(paths.icons.src).pipe(gulp.dest(paths.icons.dest));
}

function images() {
  return gulp
    .src(paths.images.src)
    .pipe(newer(paths.images.dest))
    .pipe(
      imagemin({
        progressive: true,
      })
    )
    .pipe(
      size({
        showFiles: true,
      })
    )
    .pipe(gulp.dest(paths.images.dest));
}

function scripts() {
  return (
    gulp
      .src(paths.scripts.src)
      .pipe(sourcemaps.init())
      // .pipe(uglify())
      .pipe(
        rollup({
          plugins: [resolve(), commonjs()],
        })
      )
      .pipe(
        babel({
          presets: ['@babel/preset-env'],
        })
      )
      .pipe(concat('script.min.js'))
      .pipe(sourcemaps.write('.'))
      .pipe(
        size({
          showFiles: true,
        })
      )

      .pipe(gulp.dest(paths.scripts.dest))
      .pipe(browserSync.stream())
  );
}

function copyBootstrap() {
  return gulp.src(paths.bootstrap.src).pipe(gulp.dest(paths.bootstrap.dest));
  // return gulp.src('./node_modules/bootstrap/dist/**/*')
  // .pipe(gulp.dest('./build/bootstrap'));
}
// gulp.task('default', gulp.series('clean', 'html', gulp.parallel('styles', 'scripts', 'images' , 'icons', 'fonts'),  'watch'));
// exports.clean = clean;

// // Задача для копирования файлов Bootstrap
// gulp.task('copy-bootstrap', function() {
//   return gulp.src('./node_modules/bootstrap/dist/**/*')
//     .pipe(gulp.dest('./build/bootstrap'));
// });

// // Задача по умолчанию, которая выполняет все задачи
// gulp.task('default', gulp.series('copy-bootstrap'));

exports.default = gulp.series(
  html,
  gulp.parallel(styles, scripts, copyBootstrap, images, icons, fonts),
  watch
);

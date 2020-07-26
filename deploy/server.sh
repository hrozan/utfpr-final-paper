#!/usr/bin/env bash

BUILD_COMPACT_FILE_NAME="server.tar.gz"
BUILD_DIST_DIR="./dist"
OUTPUT="/dev/null"

function clean_build_dir() {
  echo "Cleaning Build Files"
  rm -rf ${BUILD_DIST_DIR}
}

function compact_build_files() {
 echo "Compacting Files"
 tar -czvf ${BUILD_COMPACT_FILE_NAME} ${BUILD_DIST_DIR} >> ${OUTPUT}
 clean_build_dir
}

function build_server() {
  echo "Build Project"
  npm run build >> ${OUTPUT}
}

cd ./server \
&& clean_build_dir \
&& build_server \
&& compact_build_files \
|| echo "Ops Something went wrong"


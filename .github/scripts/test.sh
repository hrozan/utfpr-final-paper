#!/bin/bash

set -eu

cd packages/server/
npm ci
npm test
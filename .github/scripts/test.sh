#!/bin/bash

set -eu

cd domains/server/
npm ci
npm test
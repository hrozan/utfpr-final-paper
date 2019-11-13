#!/usr/bin/env bash

FILE_NAME="api.tar.gz"
HOST="hrozan@hrozan.xyz"

echo "🏁 Start API Deploy"
cd fp-api/

echo "📦 Packing"
tar --exclude='./node_modules/*' --exclude='./idea/*' -czvf  $FILE_NAME .

# # echo "🚀 Publish" 
scp $FILE_NAME $HOST:/home/hrozan/
ssh $HOST "tar -xvzf ${FILE_NAME} -C ./api"

# # echo "🗑 Cleaning"
rm $FILE_NAME
ssh $HOST "rm ${FILE_NAME}"
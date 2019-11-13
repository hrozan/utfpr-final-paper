#!/usr/bin/env bash

FILE_NAME="client.tar.gz"
HOST="hrozan@hrozan.xyz"

echo "🏁 Start Client Deploy"
cd fp-client/

echo "⚙️ Building"
npm run build --env production

echo "📦 Packing"
mv build client
tar -czvf $FILE_NAME ./client

echo "🚀 Publish" 
ssh $HOST "rm -rf client"
scp $FILE_NAME $HOST:/home/hrozan/
ssh $HOST "tar -xvzf ${FILE_NAME}"

echo "🗑 Cleaning"
rm $FILE_NAME
rm -rf client
ssh $HOST "rm ${FILE_NAME}"
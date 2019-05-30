set -eu
S=${START:-$1};

echo >start.txt

echo "bash" $S $(uptime) | tee start.log

export PATH=$PATH:node_modules/.bin

case $S in
glitch)
tsc -w -p public/tsconfig.es6.json & ts-node -T --project server/tsconfig.json server/server_debug.ts
;;
vsdebug)
tsc &>>start.log -w -p public/tsconfig.es6.json & node --nolazy --inspect-brk=9229 node_modules/.bin/ts-node -T --project server/tsconfig.json server/server_debug.ts
;;
vstask)
tsc &>>start.log -w -p public/tsconfig.es6.json & ts-node -T --project server/tsconfig.json server/server_debug.ts
;;
*)
echo "no launch \"$1\""
;;
esac



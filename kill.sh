set -eu;
pgrep -f -- "-p server"|| true
pgrep -f -- "-p public"||true

pkill -f -- "-p server"||true
pkill -f -- "-p public"||true


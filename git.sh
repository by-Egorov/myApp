set -x
#!/bin/bash

#!/bin/bash

cd ~/egorov.dev/Egorov/myApp || exit

git add .

message="${1:-Default commit message}"

git commit -m "$message"

git push


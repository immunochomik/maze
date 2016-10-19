#!/bin/bash
node build.js
BUILD=app.zip
rm $BUILD
zip -x app.zip              \
    -x node_modules\*       \
    -x .git\*               \
    -x .idea\*              \
    -x assets\*             \
    -x examples\*           \
    -x ansible\*            \
    -x lib\*                \
    -x .ebextensions\*      \
    -x .elasticbeanstalk\*  \
    -x lib\*                \
    -r $BUILD .
mv $BUILD ansible/$BUILD
cd ansible/
ansible-playbook deploy.yml

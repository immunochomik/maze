#!/bin/bash
node build.js production
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
export EC2_INI_PATH=/home/tomek/ansible/ec2.ini
cd ansible/ && ansible-playbook setup-server.yml

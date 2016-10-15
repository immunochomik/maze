#!/bin/bash
BUILD=app.zip
rm $BUILD
zip -x app.zip -x node_modules\* -x .git\* -x .idea\* -x assets\* -x examples\* -x lib\* -r $BUILD .


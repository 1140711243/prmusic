# `deploy.sh`

# ����������ʱ��ֹ�ű�
set -e

# ����
npm run build

# cd �����������Ŀ¼�� 
cd dist

git init
git add -A
git commit -m 'deploy'

git remote add origin https://gitee.com/cjh-1996/home_page.git
# ���� https://1140711243.github.io/<REPO>
git push -f origin master

cd -

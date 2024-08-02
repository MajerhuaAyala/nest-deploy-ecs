docker build -t hello-nest .  

docker run -p 80:80 portal


aws cloudformation create-stack --stack-name NEST-TEST-VPC --template-body file://create-vpc-template.yml --parameters file://create-vpc-template.json --capabilities CAPABILITY_NAMED_IAM --region us-east-2

aws cloudformation create-stack --stack-name NEST-TEST-ROLE --template-body file://role-template.yml --parameters file://create-vpc-template.json --capabilities CAPABILITY_NAMED_IAM --region us-east-2


aws cloudformation create-stack --stack-name NEST-TEST-RC --template-body file://repository-cluster-template.yml --parameters file://repository-cluste-template.json --capabilities CAPABILITY_NAMED_IAM --region us-east-2


aws cloudformation create-stack --stack-name NEST-TEST-PLN --template-body file://pipelene-template.yml --parameters file://pipeline-template.json --capabilities CAPABILITY_NAMED_IAM --region us-east-2

aws cloudformation create-stack --stack-name NEST-TEST-ECS --template-body file://ecs-template.yml --parameters file://ecs-template.json --capabilities CAPABILITY_NAMED_IAM --region us-east-2

aws cloudformation create-stack --stack-name NEST-TEST-EN --template-body file://s3-env-template.yml --parameters file://s3-env-template.json --capabilities CAPABILITY_NAMED_IAM --region us-east-2

aws cloudformation create-stack --stack-name NEST-TEST-DB --template-body file://database-template.yml  --capabilities CAPABILITY_NAMED_IAM --region us-east-2

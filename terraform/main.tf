terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}

resource "aws_security_group" "devops_sg" {
  name        = "devops-project-sg"
  description = "DevOps Project Security Group"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name    = "devops-project-sg"
    Project = "BSE-8B"
  }
}

resource "aws_instance" "devops_server" {
  ami                    = "ami-0c7217cdde317cfec"
  instance_type          = "t3.micro"
  key_name               = "devops-key"
  vpc_security_group_ids = [aws_security_group.devops_sg.id]

  tags = {
    Name    = "devops-project-server"
    Project = "BSE-8B"
  }
}

output "instance_public_ip" {
  value = aws_instance.devops_server.public_ip
}

output "instance_id" {
  value = aws_instance.devops_server.id
}

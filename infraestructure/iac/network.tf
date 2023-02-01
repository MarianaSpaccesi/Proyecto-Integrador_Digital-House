//network.tf

resource "aws_vpc" "dev-env" {
  cidr_block = "172.30.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support = true
  tags = {
    Name = "default"
  }
}
resource "aws_eip" "ip-dev-env" {
  vpc = true
}


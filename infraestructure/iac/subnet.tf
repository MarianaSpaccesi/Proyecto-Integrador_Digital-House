//subnets.tf
resource "aws_subnet" "public-subnet" {
  depends_on = [
    aws_vpc.dev-env
  ]

  // 172.30.30.0/24
  cidr_block = "${cidrsubnet(aws_vpc.dev-env.cidr_block, 8, 30)}"
  vpc_id = aws_vpc.dev-env.id
  map_public_ip_on_launch = true
  tags = {
    Name = "Public Subnet"
  }
}

resource "aws_route_table" "route-table-dev-env" {
  depends_on = [
    aws_vpc.dev-env,
    aws_internet_gateway.dev-env-gw,
  ]

  vpc_id = aws_vpc.dev-env.id
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.dev-env-gw.id
  }
  tags = {
    Name = "Public Subnet route table"
  }
}

resource "aws_route_table_association" "subnet-association" {
  depends_on = [
    aws_subnet.public-subnet,
    aws_route_table.route-table-dev-env,
  ]
  subnet_id      = aws_subnet.public-subnet.id
  route_table_id = aws_route_table.route-table-dev-env.id
}

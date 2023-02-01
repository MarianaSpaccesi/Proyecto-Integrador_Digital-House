//gateways.tf
resource "aws_internet_gateway" "dev-env-gw" {
  depends_on = [
    aws_vpc.dev-env,
  ]
  vpc_id = aws_vpc.dev-env.id
  tags = {
    Name = "dev-env vpc gw"
  }
}

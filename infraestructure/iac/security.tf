//security.tf
resource "aws_security_group" "sgc3g01" {
  depends_on = [
    aws_vpc.dev-env,
  ]
  name = "SG-C3G01"

  vpc_id = aws_vpc.dev-env.id

  ingress {
    description = "allow ssh"
    cidr_blocks = [
      "0.0.0.0/0"
    ]
    from_port = 22
    to_port = 22
    protocol = "tcp"
  }

  egress {
    from_port = 0
    to_port = 0
    protocol =  "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

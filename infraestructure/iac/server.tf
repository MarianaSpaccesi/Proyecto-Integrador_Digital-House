resource "aws_instance" "dev-sever" {
  depends_on = [
    aws_security_group.sgc3g01,
    aws_subnet.public-subnet
  ]
  ami = var.ami-id
  instance_type = "t2.micro"
  key_name = var.key-name
  vpc_security_group_ids = [ aws_security_group.sgc3g01.id ]
  tags = {
    Name = var.ami-name
  }

  subnet_id = aws_subnet.public-subnet.id
  provisioner "file" {
    source = "${var.base-path}/key/${var.key-name}.pem"
    destination = "/home/ubuntu/${var.key-name}.pem"

    connection {
      type = "ssh"
      user = "ubuntu"
      private_key = tls_private_key.private-key.private_key_pem
      host = "${self.public_ip}"
    }
  }
}


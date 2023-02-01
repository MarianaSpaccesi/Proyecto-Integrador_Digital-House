resource "tls_private_key" "private-key" {
  algorithm = "RSA"
  rsa_bits = 4096
}
resource "aws_key_pair" "key-pair" {
  key_name = var.key-name
  public_key = tls_private_key.private-key.public_key_openssh
  depends_on = [
    tls_private_key.private-key
  ]
}
resource "local_file" "saveKey" {
  directory_permission = "664"
  file_permission = "400"
  content = tls_private_key.private-key.private_key_pem
  filename = "${var.base-path}/key/${var.key-name}.pem"
}

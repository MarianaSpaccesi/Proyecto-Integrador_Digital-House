// variables.tf
variable "ami-name" {}
variable "ami-id" {
  type = string
  default = "ami-097a2df4ac947655f" 
} 
variable "key-name" {
  type = string
  default = "c3g01-key"
} 
variable "base-path" {
  type = string
  default = "/home/viesel/repoman/terraform"
}


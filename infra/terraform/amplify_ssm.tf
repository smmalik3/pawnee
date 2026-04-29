resource "aws_ssm_parameter" "amplify_frontend_env" {
  for_each = local.amplify_env_values

  name  = "${local.amplify_ssm_base_path}/${each.key}"
  type  = "String"
  value = tostring(each.value)

  tags = local.common_tags
}

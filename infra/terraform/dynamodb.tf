resource "aws_dynamodb_table" "citizens" {
  name         = "${local.name_prefix}-citizens"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "citizen_id"

  attribute {
    name = "citizen_id"
    type = "S"
  }

  server_side_encryption {
    enabled = true
  }

  point_in_time_recovery {
    enabled = true
  }

  tags = local.common_tags
}

resource "aws_dynamodb_table" "programs" {
  name         = "${local.name_prefix}-programs"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "program_id"

  attribute {
    name = "program_id"
    type = "S"
  }

  server_side_encryption {
    enabled = true
  }

  point_in_time_recovery {
    enabled = true
  }

  tags = local.common_tags
}

resource "aws_dynamodb_table" "engagement_events" {
  name         = "${local.name_prefix}-engagement-events"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "citizen_id"
  range_key    = "event_ts"

  attribute {
    name = "citizen_id"
    type = "S"
  }

  attribute {
    name = "event_ts"
    type = "S"
  }

  server_side_encryption {
    enabled = true
  }

  point_in_time_recovery {
    enabled = true
  }

  tags = local.common_tags
}

resource "aws_dynamodb_table" "enrollments" {
  name         = "${local.name_prefix}-enrollments"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "citizen_id"
  range_key    = "program_id"

  attribute {
    name = "citizen_id"
    type = "S"
  }

  attribute {
    name = "program_id"
    type = "S"
  }

  server_side_encryption {
    enabled = true
  }

  point_in_time_recovery {
    enabled = true
  }

  tags = local.common_tags
}

resource "aws_dynamodb_table" "feedback" {
  name         = "${local.name_prefix}-feedback"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "citizen_id"
  range_key    = "interaction_id"

  attribute {
    name = "citizen_id"
    type = "S"
  }

  attribute {
    name = "interaction_id"
    type = "S"
  }

  server_side_encryption {
    enabled = true
  }

  point_in_time_recovery {
    enabled = true
  }

  tags = local.common_tags
}

resource "aws_dynamodb_table" "interactions" {
  name         = "${local.name_prefix}-interactions"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "citizen_id"
  range_key    = "interaction_id"

  attribute {
    name = "citizen_id"
    type = "S"
  }

  attribute {
    name = "interaction_id"
    type = "S"
  }

  server_side_encryption {
    enabled = true
  }

  point_in_time_recovery {
    enabled = true
  }

  tags = local.common_tags
}

resource "aws_dynamodb_table_item" "program_tree_planting" {
  table_name = aws_dynamodb_table.programs.name
  hash_key   = aws_dynamodb_table.programs.hash_key

  item = jsonencode({
    program_id   = { S = "p1" }
    title        = { S = "Tree Planting Week" }
    description  = { S = "Join a neighborhood tree planting team this Saturday morning." }
    category     = { S = "Environment" }
    date         = { S = "2026-05-03" }
    points       = { N = "10" }
    active       = { BOOL = true }
  })
}

resource "aws_dynamodb_table_item" "program_parks_cleanup" {
  table_name = aws_dynamodb_table.programs.name
  hash_key   = aws_dynamodb_table.programs.hash_key

  item = jsonencode({
    program_id   = { S = "p2" }
    title        = { S = "Parks Cleanup Crew" }
    description  = { S = "Help clean and restore public parks with the municipal team." }
    category     = { S = "Neighborhood" }
    date         = { S = "2026-05-08" }
    points       = { N = "15" }
    active       = { BOOL = true }
  })
}

resource "aws_dynamodb_table_item" "program_reading_mentors" {
  table_name = aws_dynamodb_table.programs.name
  hash_key   = aws_dynamodb_table.programs.hash_key

  item = jsonencode({
    program_id   = { S = "p3" }
    title        = { S = "Youth Reading Mentors" }
    description  = { S = "Volunteer at after-school reading circles hosted at city libraries." }
    category     = { S = "Volunteer" }
    date         = { S = "2026-05-12" }
    points       = { N = "25" }
    active       = { BOOL = true }
  })
}

resource "aws_dynamodb_table_item" "program_transit_session" {
  table_name = aws_dynamodb_table.programs.name
  hash_key   = aws_dynamodb_table.programs.hash_key

  item = jsonencode({
    program_id   = { S = "p4" }
    title        = { S = "Transit Advisory Listening Session" }
    description  = { S = "Share ideas to improve local transit routes and rider service quality." }
    category     = { S = "Civic Voice" }
    date         = { S = "2026-05-18" }
    points       = { N = "12" }
    active       = { BOOL = true }
  })
}

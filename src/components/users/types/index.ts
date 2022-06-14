export interface Province {
  code: string
  name: string
  unit: string
}

export interface District extends Province {
  province_code: string
  province_name: string
  full_name: string
}

export interface Ward extends District {
  district_code: string
  district_name: string
  province_code: string
  province_name: string
  full_name: string
}

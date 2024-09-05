export interface LabData {
  id: string;
  seqId: number;
  gb: string;
  local_itl: string;
  local_itl_proxy: string;
  dh: string;
  kam: string;
  dep_name: string;
  building: string;
  floor: string;
  labNo: string;
  locationCode: string;
  primary_lab_cord: string;
  secondary_lab_cord: string;
  cost_center: string;
  kind_of_lab: string;
  purpose_of_lab: string;
  description: string;
  new_equipment: string;
  shared_lab: string;
  acl_req: string;
  green_ports: string;
  yellow_ports: string;
  red_ports: string;
}

export interface Entity {
  id: string;
  seqId: number;
  region: string;
  country: string;
  location: string;
  locationCode: string;
  entityName: string;
  labDataList: LabData[]; // Array of LabData
}

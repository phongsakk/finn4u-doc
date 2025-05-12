import { ConsignParam, DoAppraisal } from "@models/asset";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  DatePicker,
  TimePicker,
} from "@mui/x-date-pickers";
import { Form, Row } from "react-bootstrap";
import dayjs, { Dayjs } from "dayjs";

type DateDataModel = {
  onChange: (item: any) => void,
  value?: any;
  name?: string;
  label?:string;
  group?: string;
  className?: string;
  groupClass?: string;
}


export const DatePickerCustom = ({
  onChange,
  value,
  name,
  label,
  group,
  className = "mb-3"
}: DateDataModel) => {
  const DateValue = value ? dayjs(value) : null;
  return (
    <div className={className}>
      <DatePicker
        label={label}
        name={name}
        value={DateValue}
        onChange={(newDate: Dayjs | null) => {
          onChange((prev: any) => ({
            ...prev,
            [group as string]: {
              ...prev[group as string],
              [name as string]: newDate ? newDate.toDate() : null,
            }
          }))
        }
        }
      />
    </div>
  )

}

export const TimePickerCustom = ({
  onChange,
  value,
  name,
  label,
  group,
  className = "mb-2"
}: DateDataModel) => {
  const timeValue = value ? dayjs(value, "HH:mm") : null;
  return (
    <div className={className}>
      <TimePicker
        label={label}
        name={name}
        value={timeValue}
        onChange={(newTime) => {
          onChange((prev: any) => ({
            ...prev,
            [group as string]: {
              ...prev[group as string],
              [name as string]: newTime ? newTime.format("HH:mm") : ""
            }
          }));
        }}
      />
    </div>
  )
}
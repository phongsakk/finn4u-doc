"use client";
import { api } from "@utils/api";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ImPencil } from "react-icons/im";
import ImportTagsModal from "./TagsModal";
import { usePropertyContext } from "@component/context/PropertyContext";

function TageForm({
  data,
  setForm,
}: {
  data: any;
  setForm: (prev: any) => void;
}) {
  const { Con, TagCon, SetReTagCon, OpenTagModal } = usePropertyContext();
  const [tags, setTags] = useState<any>([]);
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const { data: res } = await axios.get(api.internal(`/api/tag`));
        console.log(data)
        if (res?.status) {
          setTags(
            res?.data?.map((item: any) => ({
              ...item,
              is_check: data.includes(item.id) ? true : false,
            }))
          );
        }
      } finally {
        SetReTagCon(false);
      }
    };
    if (Con.id != 0 || TagCon.reload == true) {
      fetchTags();
    }
  }, [Con.id, TagCon.reload]);

  const handleChecktag = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    const { checked } = e.target;
    setForm((prev: any) => {
      return {
        ...prev,
        tags: checked
          ? [...prev.tags, id]
          : prev.tags.filter((tag: number) => tag !== id),
      };
    });

    setTags((prev: any[]) =>
      prev.map((tag) => (tag.id === id ? { ...tag, is_check: checked } : tag))
    );
  };

  return (
    <>
      <div className="edit mb-3">
        <h4 className="m-0">สถานที่สำคัญบริเวณพื้นที่</h4>
        <div className="edit" onClick={OpenTagModal}>
          <ImPencil size={15} />
          <p>แก้ไข</p>
        </div>
      </div>
      <div className="area-check mb-5">
        {tags?.map((item: any, index: number) => (
          <label
            className="col-sm-auto btn btn-light btn-primary"
            htmlFor={`check_${index}`}
            key={index}
            tabIndex={0}
          >
            <input
              name={`tags[${item.id}]`}
              value={item.id}
              type="checkbox"
              id={`check_${index}`}
              className="btn-check"
              onChange={(e) => {
                handleChecktag(e, item.id);
              }}
              checked={item.is_check}
            />
            {item.name}
          </label>
        ))}
      </div>
    </>
  );
}

export default TageForm;

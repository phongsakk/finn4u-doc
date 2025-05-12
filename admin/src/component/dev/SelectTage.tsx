"use client";

export const SelectTage = ({ tags, onChange }: {
    tags: any[], onChange: (e: React.ChangeEvent<HTMLInputElement>,
        id: number) => void
}) => {

    const handleChecktag = (
        e: React.ChangeEvent<HTMLInputElement>,
        id: number
    ) => {
        const { checked, value } = e.target;

        // setTags((prevTags) =>
        //     prevTags.map((item) =>
        //         item.id === id ? { ...item, is_check: checked } : item
        //     )
        // );

        // setTagsSelect((prev) => {
        //     const updated = { ...prev };
        //     if (checked) {
        //         updated[id] = Number(value);
        //     } else {
        //         delete updated[id];
        //     }
        //     return updated;
        // });
    };
    
    return <div className="area-check mb-3">
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
                        handleChecktag(e, item.id)
                    }}
                    checked={item.is_check}
                />
                {item.name}
            </label>
        ))}
    </div>
}
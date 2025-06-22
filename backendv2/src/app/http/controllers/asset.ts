import { CustomHandler, CustomPagingHandler } from "../../../types/http";
import { safeNumber, serializeBigInt } from "../../../utils/data";
import prisma from "../../../utils/prisma";

export const Recommended: CustomPagingHandler = async (req, res) => {
  const page = safeNumber(req.query.page, 1);
  const take = safeNumber(req.query.take, 10);
  const offset = (page - 1) * take;

  const total = await prisma.$queryRawUnsafe<{total_count: number}[]>(`
  SELECT COUNT(*) AS total_count FROM (
    SELECT 1 FROM asset WHERE recommended_at IS NOT NULL
    UNION ALL
    SELECT 1 FROM sell WHERE recommended_at IS NOT NULL
  ) AS combined;
  `);
  const data = await prisma.$queryRawUnsafe<any[]>(`
    select 'ขายฝาก' as sell_type, a.id, at2."name" as asset_type, p."name" as province_name,
    a.gen_id, a.aria_size_rai, a.aria_size_ngan, a.aria_size_square_wa, a.aria_size_square_metre ,
    aa.collatera_price as price, recommended_at
    from asset a
    left join asset_type at2 on at2.id = a.asset_type_id 
    left join province p on p.id = a.province_id
    left join asset_appraisal aa on aa.asset_id = a.id
    where recommended_at is not null
    union
    select st."name" as sell_type ,s.id, at2."name" as asset_type, p."name" as province_name,
    s.gen_id as gen_id, 0 as aria_size_rai, 0 as aria_size_ngan, 0 as aria_size_square_wa, 0 as aria_size_square_metre,
    s.price, recommended_at
    from sell s 
    left join sell_type st on st.id = s.sell_type_id 
    left join asset_type at2 on at2.id = s.asset_type_id 
    left join province p on p.id = s.province_id
    where recommended_at is not null 
    order by recommended_at desc
    offset ${offset} limit ${take}
    `);

    const serial = serializeBigInt(total)
    const total_count = safeNumber(serial[0].total_count)

  res.status(200).json({
    status: true,
    code: 200,
    message: "Recommended assets fetched successfully",
    data: serializeBigInt(data),
    page: page,
    total: data.length,
    total_page: Math.ceil(total_count / take),
    limit: take,
  });
  return;
};

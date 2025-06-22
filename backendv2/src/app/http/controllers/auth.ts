import { CustomError } from "../../../types/exception";
import { CustomHandler } from "../../../types/http";
import { serializeBigInt } from "../../../utils/data";
import prisma from "../../../utils/prisma";

export const Profile: CustomHandler = async (req, res) => {
  if (req.auth) {
    const auth = req.auth;
    const data: any = auth;
    switch (auth.type) {
      case "general":
        const user = await prisma.user.findUnique({
          where: { id: auth.user_id, email: auth.email },
          omit: {
            id: true,
            deleted_at: true,
            user_role_id: true,
            user_prefix_id: true,
            password: true,
            provider: true,
            provider_token: true,
            verified: true,
            career_id: true,
            province_id: true,
            district_id: true,
            subdistrict_id: true,
          },
          include: {
            prefix: {
              select: {
                name: true,
              },
            },
            province: {
              select: {
                name: true,
              },
              where: {
                id: {
                  gt: 0,
                },
              },
            },
            district: {
              select: {
                name: true,
              },
              where: {
                id: {
                  gt: 0,
                },
              },
            },
            sub_district: {
              select: {
                name: true,
              },
              where: {
                id: {
                  gt: 0,
                },
              },
            },
          },
        });
        Object.assign(data, user);
        break;
      case "consignor":
      case "investor":
        const consignor = await prisma.consignor.findUnique({
          where: { id: auth.user_id, email: auth.email },
          omit: {
            id: true,
            deleted_at: true,
            user_role_id: true,
            user_prefix_id: true,
            password: true,
            provider: true,
            provider_token: true,
            verified: true,
            career_id: true,
            province_id: true,
            district_id: true,
            subdistrict_id: true,
          },
          include: {
            prefix: {
              select: {
                name: true,
              },
            },
            province: {
              select: {
                name: true,
              },
              where: {
                id: {
                  gt: 0,
                },
              },
            },
            district: {
              select: {
                name: true,
              },
              where: {
                id: {
                  gt: 0,
                },
              },
            },
            sub_district: {
              select: {
                name: true,
              },
              where: {
                id: {
                  gt: 0,
                },
              },
            },
          },
        });
        Object.assign(data, consignor);
        break;
      case "admin":
        const admin = await prisma.admin.findUnique({
          where: { id: auth.user_id, email: auth.email },
          omit: {
            id: true,
            deleted_at: true,
            user_role_id: true,
            user_prefix_id: true,
            password: true,
            provider: true,
            provider_token: true,
            verified: true,
            career_id: true,
            province_id: true,
            district_id: true,
            subdistrict_id: true,
          },
          include: {
            prefix: {
              select: {
                name: true,
              },
            },
            province: {
              select: {
                name: true,
              },
              where: {
                id: {
                  gt: 0,
                },
              },
            },
            district: {
              select: {
                name: true,
              },
              where: {
                id: {
                  gt: 0,
                },
              },
            },
            sub_district: {
              select: {
                name: true,
              },
              where: {
                id: {
                  gt: 0,
                },
              },
            },
          },
        });
        Object.assign(data, admin);
        break;
      default:
        throw new CustomError("unknown user type", 400);
    }

    res.status(200).json({
      message: "profile fetched successfully",
      status: true,
      code: 200,
      data: serializeBigInt(data),
    });
  } else {
    res.status(401).json({
      message: "401 but in controller",
      status: true,
      code: 401,
    });
  }
};

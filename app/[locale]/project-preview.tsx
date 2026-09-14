"use client";

import { Stack, Typography } from "@jlopvil/mui-kit";
import { Box } from "@mui/material";
import { useTranslations } from "next-intl";
import LvPreview from "./lv-preview";
import {
  ArrowPreview,
  MuiKitPreview,
  PilatesPreview,
} from "./project-preview-cards";

export default function ProjectPreview({
  type,
  tone,
}: {
  type: "cv" | "aj" | "pilates" | "muiKit" | "arrow" | "lv";
  tone: string;
}) {
  const t = useTranslations("Home");
  return (
    <Box
      sx={{
        bgcolor: "#fff",
        height: { xs: 270, md: 370 },
        p: { xs: 2, md: 3 },
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ pb: 2, borderBottom: "1px solid #ddd" }}
      >
        <Box
          sx={{
            width: type === "cv" ? 72 : 92,
            height: 14,
            bgcolor: tone,
            borderRadius: 20,
          }}
        />
        <Stack direction="row" spacing={1}>
          {[1, 2, 3].map((item) => (
            <Box key={item} sx={{ width: 30, height: 5, bgcolor: "#d7d7d2" }} />
          ))}
        </Stack>
      </Stack>
      {type === "cv" ? (
        <Stack direction="row" spacing={2.5} sx={{ pt: 3, height: "100%" }}>
          <Box sx={{ width: "34%", bgcolor: "#f5edf3", p: 2 }}>
            <Box
              sx={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                bgcolor: tone,
                mb: 2,
              }}
            />
            {[75, 95, 60, 85, 50].map((w, i) => (
              <Box
                key={i}
                sx={{
                  width: `${w}%`,
                  height: 5,
                  bgcolor: i === 0 ? tone : "#cabdc6",
                  mb: 1.2,
                }}
              />
            ))}
          </Box>
          <Box sx={{ flex: 1, pt: 1 }}>
            <Typography
              sx={{
                fontWeight: 900,
                color: tone,
                fontSize: { xs: 20, md: 30 },
                lineHeight: 1,
              }}
            >
              {t("cvName")}
            </Typography>
            <Typography sx={{ fontSize: 9, letterSpacing: 2, mt: 1, mb: 3 }}>
              {t("cvProfile")}
            </Typography>
            {[90, 98, 86, 74].map((w, i) => (
              <Box
                key={i}
                sx={{ width: `${w}%`, height: 6, bgcolor: "#dedbd8", mb: 1 }}
              />
            ))}
            <Box
              sx={{ width: "45%", height: 8, bgcolor: tone, mt: 3, mb: 1.5 }}
            />
            {[93, 70, 82].map((w, i) => (
              <Box
                key={i}
                sx={{ width: `${w}%`, height: 5, bgcolor: "#dedbd8", mb: 1 }}
              />
            ))}
          </Box>
        </Stack>
      ) : type === "aj" ? (
        <Box
          sx={{
            mt: 3,
            height: "calc(100% - 55px)",
            bgcolor: "#292929",
            color: "white",
            p: { xs: 2.5, md: 4 },
            position: "relative",
          }}
        >
          <Box
            sx={{
              width: 30,
              height: 30,
              border: `5px solid ${tone}`,
              borderRadius: "50%",
              mb: 3,
            }}
          />
          <Typography
            sx={{
              maxWidth: 420,
              fontSize: { xs: 22, md: 36 },
              fontWeight: 800,
              lineHeight: 1.08,
            }}
          >
            {t("fireHeadline")}
          </Typography>
          <Box sx={{ width: 64, height: 6, bgcolor: tone, mt: 3 }} />
          <Typography
            sx={{
              position: "absolute",
              right: 20,
              bottom: 18,
              fontSize: 10,
              color: "#aaa",
              letterSpacing: 2,
            }}
          >
            {t("fireCaption")}
          </Typography>
        </Box>
      ) : type === "pilates" ? (
        <PilatesPreview tone={tone} />
      ) : type === "arrow" ? (
        <ArrowPreview tone={tone} />
      ) : type === "lv" ? (
        <LvPreview tone={tone} />
      ) : (
        <MuiKitPreview tone={tone} />
      )}
    </Box>
  );
}

"use client";

import { Stack, Typography } from "@jlopvil/mui-kit";
import { Box } from "@mui/material";

export function PilatesPreview({ tone }: { tone: string }) {
  const days = ["L", "M", "X", "J", "V"];
  return (
    <Box sx={{ pt: 3 }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 2.5 }}
      >
        <Box>
          <Box sx={{ width: 112, height: 9, bgcolor: tone, mb: 1 }} />
          <Box sx={{ width: 76, height: 5, bgcolor: "#d8cec8" }} />
        </Box>
        <Box
          sx={{ width: 52, height: 24, borderRadius: 12, bgcolor: "#efe6e1" }}
        />
      </Stack>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          border: "1px solid #e2d9d4",
          minHeight: { xs: 165, md: 245 },
        }}
      >
        {days.map((day, index) => (
          <Box
            key={day}
            sx={{
              p: { xs: 0.75, md: 1.25 },
              borderRight: index < days.length - 1 ? "1px solid #e2d9d4" : 0,
            }}
          >
            <Typography
              sx={{ fontSize: 10, fontWeight: 900, color: tone, mb: 1.5 }}
            >
              {day}
            </Typography>
            {[0, 1].map((sessionIndex) => (
              <Box
                key={sessionIndex}
                sx={{
                  height: { xs: 38, md: 52 },
                  bgcolor: sessionIndex ? "#f5efeb" : tone + "18",
                  borderLeft: "3px solid " + (sessionIndex ? "#cbb9af" : tone),
                  mb: 1,
                  p: 0.75,
                }}
              >
                <Box
                  sx={{
                    width: "75%",
                    height: 4,
                    bgcolor: sessionIndex ? "#cbb9af" : tone,
                    mb: 0.75,
                  }}
                />
                <Box sx={{ width: "48%", height: 3, bgcolor: "#d9d2ce" }} />
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export function MuiKitPreview({ tone }: { tone: string }) {
  return (
    <Box sx={{ pt: 3 }}>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2.5}>
        <Box
          sx={{ width: { xs: "100%", sm: "35%" }, bgcolor: "#f4f7fb", p: 2 }}
        >
          <Typography
            sx={{ color: tone, fontWeight: 900, fontSize: 13, mb: 2 }}
          >
            @jlopvil/mui-kit
          </Typography>
          {["FOUNDATION", "FORMS", "FEEDBACK", "LAYOUT"].map((label, index) => (
            <Box key={label} sx={{ mb: 1.5 }}>
              <Typography
                sx={{
                  fontSize: 8,
                  fontWeight: 800,
                  color: index === 0 ? tone : "#858b95",
                }}
              >
                {label}
              </Typography>
              <Box
                sx={{
                  width: index === 0 ? "90%" : "68%",
                  height: 3,
                  bgcolor: "#d9e0e9",
                  mt: 0.5,
                }}
              />
            </Box>
          ))}
        </Box>
        <Box
          sx={{ flex: 1, border: "1px solid #e0e5eb", p: { xs: 1.5, md: 2.5 } }}
        >
          <Typography
            sx={{ fontSize: { xs: 18, md: 25 }, fontWeight: 900, mb: 2 }}
          >
            Components
          </Typography>
          <Stack direction="row" flexWrap="wrap" gap={1.25} sx={{ mb: 2.5 }}>
            <Box
              sx={{
                px: 2,
                py: 1,
                bgcolor: tone,
                color: "white",
                fontSize: 9,
                fontWeight: 800,
              }}
            >
              BUTTON
            </Box>
            <Box
              sx={{
                px: 2,
                py: 1,
                border: "1px solid " + tone,
                color: tone,
                fontSize: 9,
                fontWeight: 800,
              }}
            >
              OUTLINED
            </Box>
            <Box
              sx={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                bgcolor: "#e8eef7",
              }}
            />
          </Stack>
          <Box sx={{ border: "1px solid #dce2e9", p: 1.5, mb: 1.5 }}>
            <Box sx={{ width: "36%", height: 5, bgcolor: tone, mb: 1 }} />
            <Box sx={{ width: "82%", height: 4, bgcolor: "#d6dce3" }} />
          </Box>
          <Box
            sx={{
              width: "100%",
              height: 30,
              bgcolor: "#edf4fc",
              borderLeft: "4px solid " + tone,
            }}
          />
        </Box>
      </Stack>
    </Box>
  );
}

export function ArrowPreview({ tone }: { tone: string }) {
  return (
    <Box
      sx={{
        mt: 3,
        height: "calc(100% - 55px)",
        bgcolor: "#071226",
        color: "white",
        p: { xs: 2.5, md: 4 },
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle at 80% 25%, ${tone}55, transparent 38%)`,
        }}
      />
      <Stack
        direction="row"
        alignItems="center"
        spacing={1.2}
        sx={{ position: "relative", mb: 4 }}
      >
        <Box
          sx={{
            width: 22,
            height: 22,
            border: `5px solid ${tone}`,
            transform: "rotate(45deg)",
          }}
        />
        <Typography
          sx={{ fontSize: 11, fontWeight: 900, letterSpacing: ".12em" }}
        >
          ARROW STUDIO
        </Typography>
      </Stack>
      <Typography
        sx={{
          position: "relative",
          maxWidth: 410,
          fontSize: { xs: 24, md: 38 },
          fontWeight: 850,
          letterSpacing: "-.04em",
          lineHeight: 1.04,
        }}
      >
        DIGITAL EXPERIENCES BUILT TO GROW.
      </Typography>
      <Stack
        direction="row"
        spacing={1.5}
        sx={{
          position: "absolute",
          left: { xs: 20, md: 32 },
          bottom: { xs: 20, md: 28 },
        }}
      >
        <Box sx={{ width: 86, height: 24, bgcolor: tone, borderRadius: 12 }} />
        <Box
          sx={{
            width: 86,
            height: 24,
            border: "1px solid rgba(255,255,255,.7)",
            borderRadius: 12,
          }}
        />
      </Stack>
    </Box>
  );
}

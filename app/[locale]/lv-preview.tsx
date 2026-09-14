"use client";

import { Stack, Typography } from "@jlopvil/mui-kit";
import { Box } from "@mui/material";

export default function LvPreview({ tone }: { tone: string }) {
  return (
    <Box
      sx={{
        mt: 3,
        height: "calc(100% - 55px)",
        bgcolor: "#f2e8dc",
        color: "#3c3832",
        p: { xs: 2.5, md: 4 },
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ position: "relative", mb: { xs: 4, md: 6 } }}
      >
        <Typography
          sx={{ fontSize: 10, fontWeight: 900, letterSpacing: ".1em" }}
        >
          LIDIA VILLANUEVA BOLÍVAR
        </Typography>
        <Box
          sx={{
            width: 26,
            height: 14,
            borderTop: `2px solid ${tone}`,
            borderBottom: `2px solid ${tone}`,
          }}
        />
      </Stack>
      <Typography
        sx={{
          position: "relative",
          maxWidth: 430,
          fontFamily: "Georgia, serif",
          fontSize: { xs: 25, md: 42 },
          lineHeight: 0.98,
          letterSpacing: "-.04em",
        }}
      >
        Muévete con calma.
        <Box
          component="span"
          sx={{ display: "block", color: tone, fontStyle: "italic" }}
        >
          Vive con plenitud.
        </Box>
      </Typography>
      <Box
        sx={{
          position: "absolute",
          right: { xs: 22, md: 44 },
          bottom: { xs: 18, md: 28 },
          width: { xs: 92, md: 142 },
          height: { xs: 118, md: 180 },
          bgcolor: tone + "42",
          borderRadius: "52% 48% 44% 56% / 38% 42% 58% 62%",
          transform: "rotate(14deg)",
        }}
      />
      <Stack
        direction="row"
        spacing={1}
        sx={{
          position: "absolute",
          left: { xs: 20, md: 32 },
          bottom: { xs: 20, md: 28 },
        }}
      >
        <Box sx={{ width: 46, height: 4, bgcolor: tone }} />
        <Typography
          sx={{ fontSize: 8, letterSpacing: ".16em", fontWeight: 800 }}
        >
          PILATES · MOVIMIENTO
        </Typography>
      </Stack>
    </Box>
  );
}

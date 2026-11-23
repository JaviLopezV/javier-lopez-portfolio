"use client";

import { useActionState } from "react";
import { LockOutlined } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "../../../i18n/navigation";
import { unlockInterview } from "./actions";

export default function AccessDialog() {
  const t = useTranslations("InterviewAccess");
  const router = useRouter();
  const [error, submit, pending] = useActionState(unlockInterview, null);

  return (
    <Dialog
      open
      onClose={() => router.replace("/")}
      aria-labelledby="interview-access-title"
      aria-describedby="interview-access-description"
      fullWidth
      maxWidth="xs"
      slotProps={{ paper: { sx: { borderRadius: 4 } } }}
    >
      <Box component="form" action={submit}>
        <DialogTitle
          id="interview-access-title"
          sx={{ fontWeight: 800, pb: 1 }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <LockOutlined />
            {t("title")}
          </Box>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="interview-access-description">
            {t("description")}
          </DialogContentText>
          <TextField
            autoFocus
            required
            fullWidth
            margin="normal"
            name="code"
            label={t("code")}
            type="password"
            autoComplete="off"
            error={error === "invalid"}
            slotProps={{
              htmlInput: {
                inputMode: "numeric",
                pattern: "[0-9]+",
                maxLength: 32,
              },
            }}
          />
          {error && <Alert severity="error">{t(error)}</Alert>}
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button component={Link} href="/">
            {t("cancel")}
          </Button>
          <Button type="submit" variant="contained" disabled={pending}>
            {t(pending ? "pending" : "submit")}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}

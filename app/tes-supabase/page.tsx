"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function TesSupabase() {
  const [hasil, setHasil] = useState("Belum dites");

  async function jalankan() {
    const supabase = createClient();

    const { data, error } = await supabase.auth.signInAnonymously();
    if (error) {
      setHasil("Gagal login anonim: " + error.message);
      return;
    }

    const profil = await supabase.from("profiles").select("*");
    const klinik = await supabase.from("clinics").select("*");

    setHasil(
      `Login anonim OK. User ID: ${data.user?.id}\n` +
        `Profil terbaca: ${profil.data?.length ?? "error: " + profil.error?.message} (harusnya 1)\n` +
        `Klinik terbaca: ${klinik.data?.length ?? "error: " + klinik.error?.message} (0 tidak apa-apa, tabel masih kosong)`
    );
  }

  return (
    <main style={{ padding: 24 }}>
      <button onClick={jalankan}>Tes koneksi Supabase</button>
      <pre style={{ marginTop: 16, whiteSpace: "pre-wrap" }}>{hasil}</pre>
    </main>
  );
}
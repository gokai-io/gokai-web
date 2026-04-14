import { ImageResponse } from "next/og"

export const alt = "GŌKAI – Associação Esportiva e Ambiental"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          background: "#123020",
          color: "#f7f6f2",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 18% 24%, rgba(207,46,36,0.26), transparent 24%), radial-gradient(circle at 80% 70%, rgba(122,201,67,0.16), transparent 30%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.06,
            backgroundImage:
              "linear-gradient(to right, rgba(247,246,242,0.7) 1px, transparent 1px), linear-gradient(to bottom, rgba(247,246,242,0.7) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "64px",
            width: "100%",
            height: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
            alignItems: "center",
            gap: "16px",
            fontSize: 24,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "#7AC943",
          }}
        >
            <div style={{ width: 72, height: 2, background: "#CF2E24" }} />
            Associação Esportiva e Ambiental
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: 900 }}>
            <div
              style={{
                fontSize: 104,
                fontWeight: 900,
                letterSpacing: "-0.06em",
                lineHeight: 0.9,
              }}
            >
              GŌKAI
            </div>
            <div
              style={{
                fontSize: 40,
                lineHeight: 1.25,
                color: "rgba(247,246,242,0.8)",
              }}
            >
              Artes marciais, disciplina e formacao humana com seriedade institucional.
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontSize: 26,
              color: "rgba(247,246,242,0.56)",
            }}
          >
            <div>gokai-web.vercel.app</div>
            <div style={{ color: "#F7F6F2" }}>Disciplina, honra e evolucao continua.</div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}

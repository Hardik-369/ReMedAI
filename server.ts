import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Disease to Protein Mapping (Mock)
  const diseaseMap: Record<string, string> = {
    "Alzheimer's": "MDSKGSSQKGSRLLLLLVVSNLLLCQGVVSTPVCPNGPGNCQVSLRDLFDRAVMVSHYIHDLSS",
    "Diabetes": "MALWMRLLPLLALLALWGPDPAAAFVNQHLCGSHLVEALYLVCGERGFFYTPKTRREAEDLQVG",
    "Cancer": "MEEPQSDPSVEPPLSQETFSDLWKLLPENNVLSPLPSQAMDDLMLSPDDIEQWFTEDPGPDEAP",
    "COVID-19": "MFVFLVLLPLVSSQCVNLTTRTQLPPAYTNSFTRGVYYPDKVFRSSVLHSTQDLFLPFFSNVTW",
  };

  // API Routes
  app.post("/api/analyze", async (req, res) => {
    try {
      const { disease, proteinSequence } = req.body;
      let sequence = proteinSequence;

      if (disease && !sequence) {
        sequence = diseaseMap[disease] || "MDSKGSSQKGSRLLLLLVVSNLLLCQGVVSTPVCPNGPGNCQVSLRDLFDRAVMVSHYIHDLSS";
      }

      if (!sequence) {
        return res.status(400).json({ error: "Missing disease or protein sequence" });
      }

      // 1. Call NVIDIA NIM API (ESMFold)
      // Note: Using a mock response if API key is missing or for demo purposes
      let pdbData = `HEADER    PROTEIN STRUCTURE MOCK
ATOM      1  N   MET A   1      27.340  24.430   2.614  1.00  9.67           N
ATOM      2  CA  MET A   1      26.266  25.413   2.842  1.00 10.38           C
ATOM      3  C   MET A   1      26.913  26.639   3.531  1.00 11.29           C
ATOM      4  O   MET A   1      27.839  26.518   4.343  1.00 11.79           O
ATOM      5  CB  MET A   1      25.112  24.880   3.713  1.00 10.32           C
ATOM      6  CG  MET A   1      24.026  25.935   4.074  1.00 10.11           C
ATOM      7  SD  MET A   1      22.715  25.342   5.155  1.00 10.03           S
ATOM      8  CE  MET A   1      21.420  26.444   4.504  1.00 10.00           C
ATOM      9  N   ALA A   2      26.411  27.822   3.190  1.00 12.14           N
ATOM     10  CA  ALA A   2      26.946  29.054   3.785  1.00 13.01           C
ATOM     11  C   ALA A   2      28.454  29.144   3.540  1.00 13.60           C
ATOM     12  O   ALA A   2      29.247  28.375   4.085  1.00 13.91           O
ATOM     13  CB  ALA A   2      26.213  30.259   3.185  1.00 13.02           C
ATOM     14  N   GLY A   3      28.841  30.081   2.693  1.00 14.13           N
ATOM     15  CA  GLY A   3      30.254  30.258   2.373  1.00 14.64           C
ATOM     16  C   GLY A   3      31.106  29.022   2.648  1.00 14.89           C
ATOM     17  O   GLY A   3      32.331  29.085   2.748  1.00 15.06           O
TER      18      GLY A   3
END`;
      
      if (process.env.NVIDIA_NIM_API_KEY) {
        try {
          const nimResponse = await axios.post(
            "https://health.api.nvidia.com/v1/biology/nvidia/esmfold",
            { sequence },
            {
              headers: {
                Authorization: `Bearer ${process.env.NVIDIA_NIM_API_KEY}`,
                Accept: "application/json",
              },
            }
          );
          pdbData = nimResponse.data.pdb || pdbData;
        } catch (nimError) {
          console.error("NIM API Error:", nimError);
        }
      }

      // 2. Generate Mock Drugs
      const drugs = [
        { name: "Remedivir", score: (Math.random() * 0.25 + 0.7).toFixed(2) },
        { name: "Alzhonex", score: (Math.random() * 0.25 + 0.7).toFixed(2) },
        { name: "Glycifort", score: (Math.random() * 0.25 + 0.7).toFixed(2) },
        { name: "OncoStop", score: (Math.random() * 0.25 + 0.7).toFixed(2) },
      ].sort((a, b) => Number(b.score) - Number(a.score));

      res.json({
        pdb: pdbData,
        drugs,
        sequence
      });
    } catch (error) {
      console.error("Analysis Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

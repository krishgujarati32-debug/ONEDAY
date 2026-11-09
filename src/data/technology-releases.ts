export const stackVerifiedAt = "2026-11-09";

export type TechnologyRelease = {
  version: string;
  versionSourceUrl: string;
  versionCheckedAt: string;
  component?: string;
};

function verified(
  version: string,
  versionSourceUrl: string,
  component?: string,
): TechnologyRelease {
  return {
    version,
    versionSourceUrl,
    versionCheckedAt: stackVerifiedAt,
    component,
  };
}

function pypi(packageName: string, version: string, component?: string) {
  return verified(
    version,
    `https://pypi.org/project/${packageName}/${version}/`,
    component,
  );
}

export const releases: Readonly<Record<string, TechnologyRelease | undefined>> =
  {
    alembic: pypi("alembic", "1.20.1"),
    bandit: pypi("bandit", "1.9.4"),
    beautifulsoup: pypi("beautifulsoup4", "4.15.0"),
    celery: pypi("celery", "5.7.0"),
    dbeaver: verified(
      "26.2.4",
      "https://github.com/dbeaver/dbeaver/releases/tag/26.2.4",
    ),
    docker: verified(
      "29.9.3",
      "https://docs.docker.com/engine/release-notes/29/",
    ),
    "docker-compose": verified(
      "5.7.0",
      "https://github.com/docker/compose/releases/tag/v5.7.0",
    ),
    fastapi: pypi("fastapi", "0.162.2"),
    "gemini-api": pypi("google-genai", "3.0.0", "Python SDK"),
    "github-cli": verified(
      "2.103.3",
      "https://github.com/cli/cli/releases/tag/v2.103.3",
    ),
    grafana: verified(
      "13.3.0",
      "https://github.com/grafana/grafana/releases/tag/v13.3.0",
    ),
    helm: verified("4.3.1", "https://github.com/helm/helm/releases/tag/v4.3.1"),
    "hf-datasets": pypi("datasets", "5.1.0"),
    "hf-tokenizers": pypi("tokenizers", "0.23.3"),
    httpx: pypi("httpx", "0.28.1"),
    "hugging-face": pypi("transformers", "5.22.2"),
    joblib: pypi("joblib", "1.6.0"),
    jupyterlab: pypi("jupyterlab", "4.6.6"),
    kafka: verified("4.4.0", "https://kafka.apache.org/community/downloads/"),
    kubernetes: verified("1.37.1", "https://kubernetes.io/releases/"),
    locust: pypi("locust", "2.47.0"),
    matplotlib: pypi("matplotlib", "3.11.2"),
    mermaid: verified(
      "12.3.0",
      "https://github.com/mermaid-js/mermaid/releases/tag/mermaid%4012.3.0",
    ),
    mlflow: pypi("mlflow", "3.18.0"),
    mypy: pypi("mypy", "2.4.1"),
    numpy: pypi("numpy", "2.5.4"),
    "nvidia-container-toolkit": verified(
      "1.20.1",
      "https://github.com/NVIDIA/nvidia-container-toolkit/releases/tag/v1.20.1",
    ),
    "official-mcp-python-sdk": pypi("mcp", "2.3.0"),
    "openai-api": pypi("openai", "3.46.0", "Python SDK"),
    opentelemetry: pypi("opentelemetry-api", "1.45.2", "Python API"),
    pandas: pypi("pandas", "3.1.1"),
    peft: pypi("peft", "0.21.2"),
    pgvector: verified(
      "0.8.7",
      "https://github.com/pgvector/pgvector/tree/v0.8.7",
    ),
    "pip-audit": pypi("pip-audit", "2.10.1"),
    postgresql: verified(
      "18.6",
      "https://www.postgresql.org/support/versioning/",
    ),
    prometheus: verified("3.16.0", "https://prometheus.io/download/"),
    psycopg: pypi("psycopg", "3.3.8"),
    pwdlib: pypi("pwdlib", "0.3.1"),
    pydantic: pypi("pydantic", "2.14.3"),
    pyjwt: pypi("pyjwt", "2.15.1"),
    pypdf: pypi("pypdf", "7.0.0"),
    pytest: pypi("pytest", "9.2.0"),
    python: verified(
      "3.15.2",
      "https://www.python.org/downloads/release/python-3152/",
    ),
    "python-docx": pypi("python-docx", "1.2.0"),
    pytorch: pypi("torch", "2.15.0"),
    rabbitmq: verified(
      "4.4.0",
      "https://github.com/rabbitmq/rabbitmq-server/releases/tag/v4.4.0",
    ),
    ragas: pypi("ragas", "0.4.3"),
    "rds-postgresql": verified(
      "18.6",
      "https://docs.aws.amazon.com/AmazonRDS/latest/PostgreSQLReleaseNotes/postgresql-versions.html",
      "Supported PostgreSQL engine",
    ),
    redis: verified(
      "8.10.3",
      "https://github.com/redis/redis/releases/tag/8.10.3",
    ),
    "redis-py": pypi("redis", "8.1.0"),
    ruff: pypi("ruff", "0.17.4"),
    safetensors: pypi("safetensors", "0.8.0"),
    "scikit-learn": pypi("scikit-learn", "1.9.1"),
    scipy: pypi("scipy", "1.18.1"),
    "sentence-transformers": pypi("sentence-transformers", "6.2.0"),
    sqlalchemy: pypi("sqlalchemy", "2.1.8"),
    tensorboard: pypi("tensorboard", "2.21.0"),
    terraform: verified(
      "1.17.1",
      "https://github.com/hashicorp/terraform/releases/tag/v1.17.1",
    ),
    uv: pypi("uv", "0.13.7"),
    uvicorn: pypi("uvicorn", "0.54.0"),
    vllm: pypi("vllm", "0.33.0"),
  };

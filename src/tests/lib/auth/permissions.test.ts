import { describe, it, expect } from "vitest"
import {
  hasPermission,
  canAccess,
  isAdmin,
  getNavItemsForRole,
  NAV_ITEMS,
} from "@/lib/auth/permissions"
import type { UserRole } from "@/types/database"

describe("hasPermission", () => {
  it("presidente has wildcard access", () => {
    expect(hasPermission("presidente", "alunos:read")).toBe(true)
    expect(hasPermission("presidente", "anything:write")).toBe(true)
  })

  it("vice_presidente has wildcard access", () => {
    expect(hasPermission("vice_presidente", "usuarios:write")).toBe(true)
  })

  it("diretor_administrativo has specific permissions", () => {
    expect(hasPermission("diretor_administrativo", "alunos:read")).toBe(true)
    expect(hasPermission("diretor_administrativo", "alunos:write")).toBe(true)
    expect(hasPermission("diretor_administrativo", "frequencia:write")).toBe(false)
    expect(hasPermission("diretor_administrativo", "transparencia:write")).toBe(false)
  })

  it("diretor_financeiro has read-mostly permissions", () => {
    expect(hasPermission("diretor_financeiro", "alunos:read")).toBe(true)
    expect(hasPermission("diretor_financeiro", "alunos:write")).toBe(false)
    expect(hasPermission("diretor_financeiro", "patrocinadores:write")).toBe(true)
    expect(hasPermission("diretor_financeiro", "transparencia:write")).toBe(true)
  })

  it("diretor_tecnico_esportivo has sports-focused permissions", () => {
    expect(hasPermission("diretor_tecnico_esportivo", "frequencia:write")).toBe(true)
    expect(hasPermission("diretor_tecnico_esportivo", "campeonatos:write")).toBe(true)
    expect(hasPermission("diretor_tecnico_esportivo", "patrocinadores:write")).toBe(false)
    expect(hasPermission("diretor_tecnico_esportivo", "transparencia:write")).toBe(false)
  })

  it("professor has limited permissions", () => {
    expect(hasPermission("professor", "frequencia:read")).toBe(true)
    expect(hasPermission("professor", "frequencia:write")).toBe(true)
    expect(hasPermission("professor", "turmas:read")).toBe(true)
    expect(hasPermission("professor", "turmas:write")).toBe(false)
    expect(hasPermission("professor", "alunos:read")).toBe(true)
    expect(hasPermission("professor", "alunos:write")).toBe(false)
    expect(hasPermission("professor", "eventos:read")).toBe(false)
  })
})

describe("canAccess", () => {
  it("defaults to read action", () => {
    expect(canAccess("professor", "alunos")).toBe(true)
    expect(canAccess("professor", "eventos")).toBe(false)
  })

  it("checks write action", () => {
    expect(canAccess("professor", "frequencia", "write")).toBe(true)
    expect(canAccess("professor", "alunos", "write")).toBe(false)
  })
})

describe("isAdmin", () => {
  it("returns true for presidente and vice", () => {
    expect(isAdmin("presidente")).toBe(true)
    expect(isAdmin("vice_presidente")).toBe(true)
  })

  it("returns false for other roles", () => {
    const nonAdminRoles: UserRole[] = [
      "diretor_administrativo",
      "diretor_financeiro",
      "diretor_tecnico_esportivo",
      "professor",
    ]
    nonAdminRoles.forEach((role) => {
      expect(isAdmin(role)).toBe(false)
    })
  })
})

describe("getNavItemsForRole", () => {
  it("presidente sees all items", () => {
    const items = getNavItemsForRole("presidente")
    expect(items.length).toBe(NAV_ITEMS.length)
  })

  it("professor sees limited items", () => {
    const items = getNavItemsForRole("professor")
    const hrefs = items.map((i) => i.href)

    expect(hrefs).toContain("/app/dashboard")
    expect(hrefs).toContain("/app/frequencia")
    expect(hrefs).toContain("/app/turmas")
    expect(hrefs).toContain("/app/alunos")
    expect(hrefs).not.toContain("/app/usuarios")
    expect(hrefs).not.toContain("/app/eventos")
    expect(hrefs).not.toContain("/app/patrocinadores")
  })

  it("diretor_financeiro sees patrocinadores and transparencia but not frequencia", () => {
    const items = getNavItemsForRole("diretor_financeiro")
    const hrefs = items.map((i) => i.href)

    expect(hrefs).toContain("/app/patrocinadores")
    expect(hrefs).toContain("/app/transparencia")
    expect(hrefs).not.toContain("/app/frequencia")
    expect(hrefs).not.toContain("/app/usuarios")
  })

  it("usuarios is admin-only", () => {
    const allRoles: UserRole[] = [
      "presidente",
      "vice_presidente",
      "diretor_administrativo",
      "diretor_financeiro",
      "diretor_tecnico_esportivo",
      "professor",
    ]
    allRoles.forEach((role) => {
      const items = getNavItemsForRole(role)
      const hasUsuarios = items.some((i) => i.href === "/app/usuarios")
      if (isAdmin(role)) {
        expect(hasUsuarios).toBe(true)
      } else {
        expect(hasUsuarios).toBe(false)
      }
    })
  })
})

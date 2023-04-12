#ifndef SIGNOUTTIMERDLL_GLOBAL_H
#define SIGNOUTTIMERDLL_GLOBAL_H

#include <QtCore/qglobal.h>

#if defined(SIGNOUTTIMERDLL_LIBRARY)
#  define SIGNOUTTIMERDLL_EXPORT Q_DECL_EXPORT
#else
#  define SIGNOUTTIMERDLL_EXPORT Q_DECL_IMPORT
#endif

#endif // SIGNOUTTIMERDLL_GLOBAL_H